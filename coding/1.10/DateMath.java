import java.time.LocalDate;
import java.time.LocalTime;

public class DateMath {
    public static void main(String[] args) {
        LocalDate today = LocalDate.of(2026, 9, 19);
        LocalDate tomorrow = today.plusDays(1);
        LocalDate yesterday = today.minusDays(1);
        System.out.println(today);
        System.out.println(tomorrow);
        System.out.println(yesterday);
        System.out.println(today.plusMonths(2));

        LocalTime time = LocalTime.of(10, 30);
        System.out.println(time.plusHours(2));
        System.out.println(time.minusMinutes(30));
    }
}
