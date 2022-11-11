import React from 'react';
import './button.scss';
import { Button } from 'reactstrap';
class PrimaryButton extends React.Component {
  handleClick = () => {
    this.props.onClick();
  }
  render() {
    const {disabled} = this.props;
    return (
      <div>
        <Button
          onClick={this.handleClick}
          color="primary"
          disabled={typeof disabled !=='undefined'?disabled:false}
        >
          {this.props.title}
        </Button>
      </div>
    )
  }
}
// const PrimaryButton = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <Button
//         onClick={}
//         color="primary"
//       >
//         {props.title}
//       </Button>
//     </div>
//   );
// }

export default PrimaryButton;
