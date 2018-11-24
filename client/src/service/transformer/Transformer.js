import {MESSAGE_TYPES} from "../../common/Constants";

class Transformer {
    transformMessage = (payload) => {
        const message = JSON.parse(payload.body);
        if (MESSAGE_TYPES.JOIN === message.type) {
            return {...message, content: `${message.sender} joined.`};
        } else if (MESSAGE_TYPES.LEAVE_CHAT === message.type) {
            return {...message, content: `${message.sender} left chat.`};
        } else if (MESSAGE_TYPES.LEAVE_TOPIC === message.type) {
            return {...message, content: `${message.sender} left topic.`};
        } else {
            return message;
        }
    };
}

export default new Transformer();
