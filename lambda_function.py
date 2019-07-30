import json
import boto3



def lambda_handler(event, context):
    
    
    s3 = boto3.resource('s3')
    
    ## Bucket to use
    bucket = s3.Bucket('bucket-name')
    
    output = ''
    
    #user = event["user_name"]
    
    ## List objects within a given prefix
    for obj in bucket.objects.filter(Prefix="folder-name"+"/"):
        if(obj.key[-1]!="/"):
            output = output + "/"+obj.key + ";"

    
   

    return {
        "statusCode": 200,
        "body": json.dumps(output),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            }
    }

