module os.team.cpuscheduling {
    requires javafx.controls;
    requires javafx.fxml;

    requires com.dlsc.formsfx;

    opens os.team.cpuscheduling to javafx.fxml;
    exports os.team.cpuscheduling;
}