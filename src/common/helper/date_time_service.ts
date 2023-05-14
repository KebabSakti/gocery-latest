import { DateTime } from "luxon";

class DateTimeService {
  static toSqlTimestamp(dateTime: DateTime): string {
    const formatted = dateTime.toFormat("yyyy-LL-dd HH:mm:ss");

    return formatted;
  }

  static nowSqlTimestamp(): string {
    const now = DateTime.now();
    const formatted = DateTimeService.toSqlTimestamp(now);

    return formatted;
  }
}

export { DateTimeService };
