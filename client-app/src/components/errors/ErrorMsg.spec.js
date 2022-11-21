import { render, fireEvent, screen } from "@testing-library/react";
import ErrorMsg from "./ErrorMsg";


test("display error title and message", () => {

    render(<ErrorMsg errorTitle='error title' errorMsg='error message' />);

    screen.getByText('error title');
    screen.getByText('error message');

});

test("no title set only show message", () => {

    render(<ErrorMsg errorTitle='' errorMsg='error message' />);

    expect(screen.queryByTestId('toggle')).toBeFalsy();
    screen.getByText('error message');

});