import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { PaginateModel } from "../../model/paginate_model";

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

  static paginate(
    current: number = 0,
    limit: number = 10
  ): PaginateModel | undefined {
    if (current && limit) {
      let offset = current > limit ? 0 : current;
      const paginateModel = { current: offset, limit: limit };

      return paginateModel;
    }
  }

  static parseQuery(query: Map<string, string>): Map<string, string> {
    let buildQuery = new Map<string, any>();

    if (query.has("paginate")) {
      const current =
        query["paginate"]["current"] > query["paginate"]["limit"]
          ? 0
          : query["paginate"]["current"];

      buildQuery.set("paginate", {
        current: current,
        limit: query["paginate"]["limit"],
      });
    }

    if (query.has("filter")) {
      buildQuery.set("filter", query["filter"]);
    }

    if (query.has("sort")) {
      buildQuery.set("sort", {
        field: query["sort"]["field"],
      });
    }

    return buildQuery;
  }
}

export { Utility };
