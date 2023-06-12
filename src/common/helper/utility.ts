import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

class Utility {
  static uuid(): string {
    return uuidv4();
  }

  static toSqlTimestamp(dateTime: DateTime): string {
    const formatted = dateTime.toFormat("yyyy-LL-dd HH:mm:ss");

    return formatted;
  }

  static nowSqlTimestamp(): string {
    const now = DateTime.now();
    const formatted = Utility.toSqlTimestamp(now);

    return formatted;
  }
}

export { Utility };
