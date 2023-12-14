class ApiResponse {
  // Constructor function that initializes the properties of the ApiResponse instance
  constructor(statusCode, data, message) {
    // Property: HTTP status code of the response
    this.statusCode = statusCode;

    // Property: Data payload of the response
    this.data = data;

    // Property: Human-readable message associated with the response
    this.message = message;

    // Property: Boolean indicating whether the response is considered successful
    // (based on whether the status code is less than 400, where 400 and above are typically errors)
    this.success = statusCode < 400;
  }
}

// Exporting the ApiResponse class to make it available for use in other modules
export { ApiResponse };
