import React, { useState } from 'react';
import { TextInput } from 'react-native';

const FocusableInput = (props) => {
    const [isFocused, setFocused] = useState(false);
  
    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);
  
    return (
        <TextInput
            {...props}
            style={[
                props.style,
                { borderColor: isFocused ? '#3BCDA1' : '#CECECE' }
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    );
};

export default FocusableInput;