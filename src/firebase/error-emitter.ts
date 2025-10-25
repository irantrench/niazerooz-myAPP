import { EventEmitter } from 'events';
import type { FirestorePermissionError } from './errors';

// Define the types of events and their corresponding payloads.
type ErrorEvents = {
  'permission-error': (error: FirestorePermissionError) => void;
};

// Strongly type the EventEmitter.
class TypedEventEmitter<T extends Record<string, (...args: any[]) => void>> {
  private emitter = new EventEmitter();

  on<E extends keyof T>(event: E, listener: T[E]): void {
    this.emitter.on(event as string, listener);
  }

  off<E extends keyof T>(event: E, listener: T[E]): void {
    this.emitter.off(event as string, listener);
  }

  emit<E extends keyof T>(event: E, ...args: Parameters<T[E]>): void {
    this.emitter.emit(event as string, ...args);
  }
}

/**
 * A global, typed event emitter for broadcasting application-wide errors.
 * This is primarily used to decouple the source of a Firestore permission error
 * from the UI component that displays it, allowing for a centralized error
 * handling strategy.
 */
export const errorEmitter = new TypedEventEmitter<ErrorEvents>();
