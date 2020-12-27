import moment from "moment";

export default function time(time) {
    return moment(time).format("YYYY-MM-DD HH:mm:ss");
};
