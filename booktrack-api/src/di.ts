type Constructor<T> = new (...args: any[]) => T;

class DIContainer {
  private services = new Map<string, any>();

  register<T>(ClassRef: Constructor<T>) {
    const instance = new ClassRef();
    this.services.set(ClassRef.name, instance);
  }

  getService<T>(ClassRef: Constructor<T>): T {
    const service = this.services.get(ClassRef.name);
    if (!service) {
      throw new Error(`Serviço não registrado: ${ClassRef.name}`);
    }
    return service;
  }
}

export const di = new DIContainer();
