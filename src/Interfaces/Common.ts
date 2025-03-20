/**
 * Interface for MCP-compatible response format
 */
export interface McpResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
  [key: string]: any; // Add index signature
}

/**
 * Formats a response for MCP compatibility
 * @param data The data to format
 * @param message Optional message to display
 * @param isError Whether this is an error response
 * @returns MCP-compatible response
 */
export function formatMcpResponse(data: any, message?: string, isError = false): McpResponse {
  return {
    content: [
      {
        type: "text",
        text: message || (isError ? "Error occurred" : "Request successful")
      },
      {
        type: "text",
        text: typeof data === 'string' ? data : JSON.stringify(data, null, 2)
      }
    ],
    rawData: data,
    isError
  };
}

/**
 * Creates an error response
 * @param error The error that occurred
 * @returns MCP-compatible error response
 */
export function formatErrorResponse(error: any): McpResponse {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return formatMcpResponse({ error: errorMessage }, `Error: ${errorMessage}`, true);
} 