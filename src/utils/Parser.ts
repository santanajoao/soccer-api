class Parser {
  public static parseBoolean = (boolString: string): boolean | undefined => {
    if (!boolString) {
      return undefined;
    }

    return boolString === 'true';
  };
}

export default Parser;
