'use client';

/**
 * Defines the context for a Firestore security rule violation. This rich context is
 * used to generate a detailed error message, which is invaluable for debugging
 * security rules during development.
 */
export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any; // The data being sent with a write/update/create request
};

/**
 * A custom error class that encapsulates a Firestore security rule permission error.
 * It carries a structured context about the failed operation, which can be
 * displayed in the development environment to help developers quickly understand
 * and fix their security rules.
 */
export class FirestorePermissionError extends Error {
  public context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    // Construct a detailed, human-readable error message.
    const message = `
FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:
{
  "operation": "${context.operation}",
  "path": "${context.path}",
  "requestData": ${JSON.stringify(context.requestResourceData, null, 2)}
}
`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;

    // This is to ensure the prototype chain is correctly set up for extending built-in classes.
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }
}
