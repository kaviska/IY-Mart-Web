class LocalStorageHandler {
    static setItem<T>(key: string, value: T): void {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    }
  
    static getItem<T>(key: string, defaultValue?: T): T | null {
      try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : defaultValue ?? null;
      } catch (error) {
        console.error("Error retrieving from localStorage", error);
        return defaultValue ?? null;
      }
    }
  
    static removeItem(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Error removing from localStorage", error);
      }
    }
  
    static clear(): void {
      try {
        localStorage.clear();
      } catch (error) {
        console.error("Error clearing localStorage", error);
      }
    }
  
    static getAllKeys(): string[] {
      return Object.keys(localStorage);
    }
  
    static hasKey(key: string): boolean {
      return localStorage.getItem(key) !== null;
    }
  
    static updateItem<T>(key: string, updateFn: (oldValue: T | null) => T): void {
      try {
        const oldValue = this.getItem<T>(key);
        const newValue = updateFn(oldValue);
        this.setItem(key, newValue);
      } catch (error) {
        console.error("Error updating localStorage", error);
      }
    }
  }
  
  export default LocalStorageHandler;
  