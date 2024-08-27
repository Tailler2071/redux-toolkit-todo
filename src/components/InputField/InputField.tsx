import {FC} from "react";
import {InputFieldProps} from "./InputField.props.ts";

const InputField: FC<InputFieldProps> = ({text, handleInput, handleSubmit}) => {
    return (
        <div className="control">
            <label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => handleInput(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit}>Add Todo</button>
        </div>
    );
};

export default InputField;
