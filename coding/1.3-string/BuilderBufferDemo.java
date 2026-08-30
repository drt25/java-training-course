public class BuilderBufferDemo {
    public static void main(String[] args) {
        StringBuilder report = new StringBuilder();
        report.append("Employee Report\n");
        report.append("----------------\n");
        report.append("Name: Ram\n");
        report.append("Age: 25\n");
        report.append("Department: IT\n");
        System.out.println(report);

        StringBuilder builder = new StringBuilder("Hello");
        System.out.println("builder before id=" + System.identityHashCode(builder));
        builder.append(" Java");
        System.out.println("builder after  id=" + System.identityHashCode(builder));
        System.out.println(builder);

        builder.insert(5, " Broadway");
        System.out.println("insert=" + builder);
        System.out.println("reverse=" + new StringBuilder("321").reverse());

        StringBuffer buffer = new StringBuffer("Hello");
        buffer.append(" Java");
        System.out.println("buffer=" + buffer);
        System.out.println("as String=" + buffer.toString());
    }
}
