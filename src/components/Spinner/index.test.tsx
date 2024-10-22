import * as React from 'react';
import { render, screen } from "@testing-library/react";
import Spinner from '.';

describe('components', ()=> {
    describe('Spinner', ()=> {
        it("should render the spinner with default color", () => {
            render(<Spinner />);
            
            const spinner = screen.getByTestId("test--spinner");
            expect(spinner).toBeInTheDocument();
            expect(spinner).toHaveStyle("border: 5px solid #fff");
        });
    
        it("should render the spinner with a custom color", () => {
            render(<Spinner color="red" />);
            
            const spinner = screen.getByTestId("test--spinner");
            expect(spinner).toBeInTheDocument();
            expect(spinner).toHaveStyle("border: 5px solid red");
        });
    
        it("should have the correct aria-label", () => {
            render(<Spinner />);
            
            const spinner = screen.getByTestId("test--spinner");
            expect(spinner).toHaveAttribute("aria-label", "Carregando...");
        });
    })
})