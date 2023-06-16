class DataHandler {
  public static removeObjectUndefined = (object: Record<string, unknown>) => {
    const tratedWhere: Record<string, unknown> = {};

    Object
      .entries(object)
      .forEach(([key, value]) => {
        if (value !== undefined) tratedWhere[key] = value;
      });

    return tratedWhere;
  };
}

export default DataHandler;
