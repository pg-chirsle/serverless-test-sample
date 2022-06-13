export enum StatusCode {
  SUCCESS = 200,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  UNAUTHORIZE = 401,
}

class APIResponse {

  static badRequest(errorMessage: string, status: number = StatusCode.BAD_REQUEST) {
    return {
      statusCode: status,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({error: errorMessage})
    }
  }

  static success(body: {[key: string]: any}) {
    return {
      statusCode: StatusCode.SUCCESS,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({...body})
    }
  }

}

export default APIResponse