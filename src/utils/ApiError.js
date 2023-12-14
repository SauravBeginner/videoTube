// Define a custom error class 'ApiError' that extends the built-in 'Error' class

class ApiError extends Error {
  // Constructor function for creating instances of the 'ApiError' class

  constructor(
    statusCode, // HTTP status code associated with the error
    message = "Something went wrong", // Default error message if not provided
    errors = [], // Array of additional error details or validation errors
    stack = "" // Custom stack trace (if provided)
  ) {
    // Call the constructor of the parent 'Error' class and set the error message
    super(message);

    // Set properties specific to the 'ApiError' class

    this.statusCode = statusCode; // HTTP status code

    this.data = null; // Additional data associated with the error (initially set to null)

    this.message = message; // Error message

    this.success = false; // Boolean indicating whether the operation was successful (initially set to false)

    this.errors = errors; // Array of additional error details or validation errors

    // Check if a custom stack trace is provided
    if (stack) {
      this.stack = stack; // Set the custom stack trace
    } else {
      // If no custom stack trace is provided, capture the stack trace starting from this constructor

      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the 'ApiError' class to make it accessible in other modules
export { ApiError };
