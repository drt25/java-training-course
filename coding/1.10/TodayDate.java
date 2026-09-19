import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class TodayDate {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        LocalDate date = LocalDate.of(2026, 9, 19);
        System.out.println(today);
        System.out.println(date);

        LocalTime currentTime = LocalTime.now();
        LocalTime time = LocalTime.of(10, 30);
        System.out.println(currentTime);
        System.out.println(time);

        LocalDateTime now = LocalDateTime.now();
        System.out.println(now);
    }
}
