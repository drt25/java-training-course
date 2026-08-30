public class LoopsDemo {
    public static void main(String[] args) {
        System.out.println("-- for (known count) --");
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }

        System.out.println("-- while (check first) --");
        int paper = 3;
        while (paper > 0) {
            System.out.println("print receipt, paper left=" + paper);
            paper--;
        }

        System.out.println("-- do-while (at least once) --");
        int choice = 3;
        do {
            System.out.println("Menu: 1 Deposit  2 Withdraw  3 Exit");
            System.out.println("choice=" + choice);
        } while (choice != 3);
    }
}
