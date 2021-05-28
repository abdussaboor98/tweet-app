package com.tweetapp.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DateTimeUtil {

    public static ZonedDateTime localToZonedDateTimeAtUTC(LocalDateTime ldt) {
        return ldt.atZone(ZoneId.of("UTC"));
    }

    private DateTimeUtil() {

    }
}
