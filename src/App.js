import 'antd/dist/reset.css';
import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/home/Home';
import { Dyeing } from './pages/dyeing/Dyeing';
import { Slitting } from './pages/slitting/Slitting';
import { Stenter } from './pages/stenter/Stenter';
import { Compector } from './pages/compector/Compector';
import { Delivery } from './pages/delivery/Delivery';
import { PlanningHome } from './pages/planning-home/PlanningHome';
import { BatchCreator } from './pages/batch-creator/BatchCreator';
import { BatchEditor } from './pages/batch-editor/BatchEditor';
import { BatchViewer } from './pages/batch-viewer/BatchViewer';
import { ConfigProvider } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import { dndDragEndDetailState } from './services/BeautifulDnD';


const createPage = component => <div className="app">{component}</div>;

const App = () => {
    const setDragEndState = useSetRecoilState(dndDragEndDetailState);

    return (
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 4,
                    colorBorder: "#ccc",
                    colorBorderSecondary: "#ddd"
                },
                components: {
                    //
                }
            }}
        >
            <DragDropContext onDragEnd={(result, provided) => setDragEndState({ result, provided })}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={createPage(<Home />)} />
                        <Route path='/dyeing' element={createPage(<Dyeing />)} />
                        <Route path='/slitting' element={createPage(<Slitting />)} />
                        <Route path='/stenter' element={createPage(<Stenter />)} />
                        <Route path='/compector' element={createPage(<Compector />)} />
                        <Route path='/delivery' element={createPage(<Delivery />)} />
                        <Route path='/planning' element={createPage(<PlanningHome />)} />
                        <Route path='/planning/create-batch' element={createPage(<BatchCreator />)} />
                        <Route path='/planning/edit-batch' element={createPage(<BatchEditor />)} />
                        <Route path='/planning/view-batch' element={createPage(<BatchViewer />)} />
                    </Routes>
                </BrowserRouter>
            </DragDropContext>
        </ConfigProvider>
    );
};

export default App;
