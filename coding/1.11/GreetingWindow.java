import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;

public class GreetingWindow {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Greeting");
            JTextField name = new JTextField(12);
            JButton greet = new JButton("Greet");
            JLabel hello = new JLabel("Type a name.");

            greet.addActionListener(event ->
                    hello.setText("Hello, " + name.getText()));

            JPanel panel = new JPanel();
            panel.add(name);
            panel.add(greet);
            panel.add(hello);

            frame.add(panel);
            frame.setSize(320, 120);
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setVisible(true);
        });
    }
}
