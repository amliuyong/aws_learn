from chalice import Chalice
from chalice import BadRequestError
from chalice import UnauthorizedError
from chalice import NotFoundError
from chalice import Response

import sys

from chalice import Chalice
if sys.version_info[0] == 3:
    # Python 3 imports.
    from urllib.parse import urlparse, parse_qs
else:
    # Python 2 imports.
    from urlparse import urlparse, parse_qs

app = Chalice(app_name='greetingOnDemand')
app.debug = True



CITIES_TO_STATE = {
    'seattle': 'WA',
    'portland': 'OR',
}

OBJECTS = {
}

@app.route('/')
def index():
    return {'hello': 'world'}

@app.route('/cities/{city}')
def state_of_city(city):
    return {'state': CITIES_TO_STATE[city]}


@app.route('/cities_try/{city}')
def state_of_city_try(city):
    try:
        return {'state': CITIES_TO_STATE[city]}
    except KeyError:
        raise BadRequestError("Unknown city '%s', valid choices are: %s" % (
            city, ', '.join(CITIES_TO_STATE.keys())))


@app.route('/resource/{value}', methods=['PUT'])
def put_test(value):
    return {"value": value}

@app.route('/myview', methods=['POST', 'PUT'])
def myview():
    print("invoke /myview")


## we'll create that key by sending a PUT request.
# echo '{"foo": "bar"}' | http PUT https://endpoint/api/objects/mykey
# http POST https://endpoint/api/ states=WA states=CA --debug
@app.route('/objects/{key}', methods=['GET', 'PUT'])
def myobject(key):
    request = app.current_request
    if request.method == 'PUT':
        OBJECTS[key] = request.json_body
    elif request.method == 'GET':
        try:
            return {key: OBJECTS[key]}
        except KeyError:
            raise NotFoundError(key)

@app.route('/introspect')
def introspect():
    return app.current_request.to_dict()



# http --form POST https://endpoint/api/formtest states=WA states=CA --debug
@app.route('/formtest', methods=['POST'],
           content_types=['application/x-www-form-urlencoded'])
def formtest():
    parsed = parse_qs(app.current_request.raw_body.decode())
    return {
        'states': parsed.get('states', [])
    }


@app.route('/res_text')
def res_text():
    return Response(body='hello world!',
                    status_code=200,
                    headers={'Content-Type': 'text/plain'})

# Tutorial: GZIP compression for json
import json
import gzip

# app.api.binary_types.append('application/json')

@app.route('/gziptest')
def gzip_test():
    blob = json.dumps({'hello': 'world'}).encode('utf-8')
    payload = gzip.compress(blob)
    custom_headers = {
        'Content-Type': 'application/json',
        'Content-Encoding': 'gzip'
    }
    return Response(body=payload,
                    status_code=200,
                    headers=custom_headers)



# Tutorial: CORS Support

@app.route('/supports-cors', methods=['PUT'], cors=True)
def supports_cors():
    return {}


from chalice import CORSConfig
cors_config = CORSConfig(
    allow_origin='https://foo.example.com',
    allow_headers=['X-Special-Header'],
    max_age=600,
    expose_headers=['X-Special-Header'],
    allow_credentials=True
)
@app.route('/custom_cors', methods=['GET'], cors=cors_config)
def supports_custom_cors():
    return {'cors': True}



#You should only supply a single origin to the CORSConfig object. If you need to supply multiple origins you will need to define a custom handler for it that accepts OPTIONS requests and matches the Origin header against a whitelist of origins. If the match is successful then return just their Origin back to them in the Access-Control-Allow-Origin header.

_ALLOWED_ORIGINS = set([
    'http://allowed1.example.com',
    'http://allowed2.example.com',
])


@app.route('/cors_multiple_origins', methods=['GET', 'OPTIONS'])
def supports_cors_multiple_origins():
    method = app.current_request.method
    if method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Method': 'GET,OPTIONS',
            'Access-Control-Allow-Origin': ','.join(_ALLOWED_ORIGINS),
            'Access-Control-Allow-Headers': 'X-Some-Header',
        }
        origin = app.current_request.headers.get('origin', '')
        if origin in _ALLOWED_ORIGINS:
            headers.update({'Access-Control-Allow-Origin': origin})
        return Response(
            body=None,
            headers=headers,
        )
    elif method == 'GET':
        return 'Foo'



# Tutorial: Policy Generation

import json
import boto3
from botocore.exceptions import ClientError

from chalice import NotFoundError


S3 = boto3.client('s3', region_name='us-west-1')
BUCKET = 'yongliu-s3-bucket'

@app.route('/s3objects/{key}', methods=['GET', 'PUT'])
def s3objects(key):
    request = app.current_request
    if request.method == 'PUT':
        S3.put_object(Bucket=BUCKET, Key=key,
                      Body=json.dumps(request.json_body))
    elif request.method == 'GET':
        try:
            response = S3.get_object(Bucket=BUCKET, Key=key)
            return json.loads(response['Body'].read())
        except ClientError as e:
            raise NotFoundError(key)
