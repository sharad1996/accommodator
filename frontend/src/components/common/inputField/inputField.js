import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import './input_field.scss';

const InputField = props => {
  return (
    <div>
      <InputGroup>
        {typeof props.content !== 'undefined' && (
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <img height={'25px'} src={props.content} alt='mail' />
            </InputGroupText>
          </InputGroupAddon>
        )}
        <Input
          autoComplete={'off'}
          className={props.value ? 'activated' : ''}
          type={props.type}
          onChange={props.onChange}
          value={props.value}
          name={props.name}
          maxLength={props.maxLength}
        />
        <span className='floating-label'>{typeof props.placeholder !== 'undefined' ? props.placeholder : ''}</span>
      </InputGroup>
    </div>
  );
};

export default InputField;
