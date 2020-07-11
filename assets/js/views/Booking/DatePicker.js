import React from "react";
import Datetime from "react-datetime";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import styles from "../../../jss/material-kit-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function DatePicker(props) {
    const classes = useStyles();

    function onChangeDate(date) {
        // console.log("onChangeDate");
        // props.onChange(date._d, props.data.input);
        props.data.input.value = date._d;

        // let selectedDate = new Date(date._d);
        // let timeZone = date._d.getTimezoneOffset()
        // let stringDate = selectedDate.getUTCFullYear() + '-' + (selectedDate.getUTCMonth() + 1) + '-' + selectedDate.getUTCDate() + ' ' + selectedDate.getUTCHours() + ':' + (parseInt(selectedDate.getUTCMinutes()) - parseInt(timeZone)) + ':0'
        // let timeZoneLessDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedDate.getHours(), (parseInt(selectedDate.getMinutes()) - parseInt(timeZone)), 0);
        // console.log(timeZoneLessDate);
        // // props.data.input.value = date._d;
        // props.data.input.value = timeZoneLessDate;

    }

    return (
        <span>
            <InputLabel className={classes.label}>
                {props.data.input.name === 'checkIn' ? "Arrivée" : "Départ"}
            </InputLabel>
            <br />
            <FormControl fullWidth>
            <Datetime
                inputProps={{ 
                    type: props.data.type,
                    step: props.data.step,
                    name: props.data.input.name,
                    required: props.data.required,
                    placeholder: "",
                    autoComplete:"new-password",
                    id: `booking_${props.data.input.name}`,
                }}
                {...props.data.input}
                onChange={ onChangeDate }
            />
            </FormControl>
        </span>
    );
}
