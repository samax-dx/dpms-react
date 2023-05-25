import mcss from './BasicLogo.module.css';

import React from 'react';
import { Link } from "react-router-dom";


export const BasicLogo = () => <div className={mcss.logo}><Link to={'/'}>DPMS</Link></div>;