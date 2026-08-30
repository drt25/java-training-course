public class IfLogic {
    public static void main(String[] args) {
        int balance = 1500;
        int amount = 200;
        boolean frozen = false;
        boolean cardOk = true;
        boolean pinOk = true;

        if (balance >= amount) {
            System.out.println("Sent");
        } else if (frozen) {
            System.out.println("Wallet locked");
        } else {
            System.out.println("Not enough balance");
        }

        boolean balanceOk = balance >= amount;
        if (!frozen && balanceOk) {
            System.out.println("Send allowed");
        }

        // Wrong: cardOk || pinOk — one can fail and still pass.
        // Right: both must be true.
        if (cardOk && pinOk) {
            System.out.println("ATM login ok");
        }
    }
}
