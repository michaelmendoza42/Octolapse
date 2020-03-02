Octolapse.Simplify3dExtruderViewModel = function (values, extruder_index) {
    var self=this;
    self.index = extruder_index;
    self.retraction_distance = ko.observable(null);
    self.retraction_vertical_lift = ko.observable(null);
    self.retraction_speed = ko.observable(null);
    self.extruder_use_retract = ko.observable(false);

    if (values && values.extruders.length > self.index) {
        var extruder = values.extruders[self.index];
        if (!extruder)
            return;
        self.retraction_distance(extruder.retraction_distance);
        self.retraction_vertical_lift(extruder.retraction_vertical_lift);
        self.retraction_speed(extruder.retraction_speed);
        self.extruder_use_retract(extruder.extruder_use_retract || false);
    }
};

Octolapse.Simplify3dViewModel = function (values, num_extruders_observable) {
    var self = this;
    // Observables
    self.num_extruders_observable = num_extruders_observable;
    var extruders = [];
    for (var index = 0; index < self.num_extruders_observable(); index++)
    {
        extruders.push(new Octolapse.Simplify3dExtruderViewModel(values, index))
    }
    self.extruders = ko.observableArray(extruders);
    self.x_y_axis_movement_speed = ko.observable(values.x_y_axis_movement_speed);
    self.z_axis_movement_speed = ko.observable(values.z_axis_movement_speed);
    self.spiral_vase_mode = ko.observable(values.spiral_vase_mode || false);
    self.layer_height = ko.observable(values.layer_height);
    // Constants
    self.speed_tolerance = values.speed_tolerance;
    self.axis_speed_display_settings = 'mm-min';
    self.round_to_increment_percent = 1;
    self.round_to_increment_speed_mm_min = 0.1;
    self.round_to_increment_length = 0.01;
    self.percent_value_default = 100.0;

     self.num_extruders_observable.subscribe(function() {
        var num_extruders = self.num_extruders_observable();
        if (num_extruders < 1) {
            num_extruders = 1;
        }
        else if (num_extruders > 16){
            num_extruders = 16;
        }
        var extruders = self.extruders();
        while(extruders.length < num_extruders)
        {
            var new_extruder = new Octolapse.Simplify3dExtruderViewModel(null, extruders.length-1);
            extruders.push(new_extruder);
        }
        while(extruders.length > num_extruders)
        {
             extruders.pop();
        }
        self.extruders(extruders);
    });
};
