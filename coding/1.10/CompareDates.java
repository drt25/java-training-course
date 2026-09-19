import java.time.LocalDate;

public class CompareDates {
    public static void main(String[] args) {
        LocalDate date1 = LocalDate.of(2026, 9, 10);
        LocalDate date2 = LocalDate.of(2026, 9, 20);

        System.out.println(date1.isBefore(date2));
        System.out.println(date1.isAfter(date2));
        System.out.println(date1.isEqual(date2));
    }
}
