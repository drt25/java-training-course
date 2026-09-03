public class StaticUses {
    public static void main(String[] args) {
        new CountedAccount();
        new CountedAccount();
        System.out.println(CountedAccount.accountCount);
    }
}

class CountedAccount {
    static int accountCount = 0;

    CountedAccount() {
        accountCount++;
    }
}
