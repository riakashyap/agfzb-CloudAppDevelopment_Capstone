from cloudant.client import Cloudant
from cloudant.error import CloudantException


# main() will be run automatically when this action is invoked in IBM Cloud
def main(dict):
    """
    Gets the car reviews for a specified dealership

    :param dict: Cloud Functions actions accept a single parameter, which must be a JSON object.
                In this case, the param must be an a JSON object with the key "dealerId" with the dealership id as value (string or int)
                I.e: {"dealerId": "15"}
    :return: The action returns a JSON object consisting of the HTTP response with all reviews for the given dealership.
    """

    secret = {
        "URL": "https://063fc40b-3037-44c2-b49d-f73c018315e2-bluemix.cloudantnosqldb.appdomain.cloud",
        "IAM_API_KEY": "XLTuMo5dArgNNUf-aaATYohUVn73ES5fA9rriCFtGlHE",
        "ACCOUNT_NAME": "063fc40b-3037-44c2-b49d-f73c018315e2-bluemix",
    }

    client = Cloudant.iam(
        account_name=secret["ACCOUNT_NAME"],
        api_key=secret["IAM_API_KEY"],
        url=secret["URL"],
        connect=True,
    )

    my_database = client["reviews"]
    print(my_database)

    try:
        selector = {'dealership': {'$eq': int(dict["dealerId"])}}
        result_by_filter = my_database.get_query_result(
            selector, raw_result=True)

        result = {
            'headers': {'Content-Type': 'application/json'},
            'body': {'data': result_by_filter}

        }
        return result
    except:

        return {
            'statusCode': 404,
            'message': "Something went wrong"
        }
