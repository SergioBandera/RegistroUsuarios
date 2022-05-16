/* eslint-disable testing-library/render-result-naming-convention */
import React from 'react';
import {Admin} from "./Admin"
import '@testing-library/jest-dom/extend-expect'
import { render, screen} from "@testing-library/react"
import { Provider } from "react-redux"
import Store from '../Redux/Store';


test ("probar si se renderiza el Admin", () => {
    const admin = render(<Provider store={Store}><Admin/> </Provider>)
   
    
   })