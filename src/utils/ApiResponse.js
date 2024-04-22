class ApiResponse {
  constructor(data, message = "Success", statusCode) {
    this.message = message;
    this.success = statusCode < 400;
    this.data = data;
  }
}

export {ApiResponse}
