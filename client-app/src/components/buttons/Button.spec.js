import { render, screen } from "@testing-library/react";
import Button from "./Button";


test("disabled in loading state", () => {
// render the component on virtual dom
render(<Button loading={true} content='buttons label' />);

//select the elements you want to interact with
const button = screen.getByRole("button");

//assert the expected result
expect(button).toBeDisabled();
expect(button).toHaveTextContent('buttons label');

});

test("enabled in non loading state", () => {
    // render the component on virtual dom
    render(<Button loading={false}  content='buttons label' />);
    
    //select the elements you want to interact with
    const button = screen.getByRole("button");
    
    //assert the expected result
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent('buttons label');
});