import 'antd/dist/reset.css';
import './App.css';

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from './components/HomePage/HomePage';
import { DyeingPage } from './components/DyeingPage/DyeingPage';
import { SlittingPage } from './components/SlittingPage/SlittingPage';
import { StenterPage } from './components/StenterPage/StenterPage';
import { CompectorPage } from './components/CompectorPage/CompectorPage';
import { DeliveryPage } from './components/DeliveryPage/DeliveryPage';
import { PlanningHomePage } from './components/PlanningHomePage/PlanningHomePage';
import { BatchCreatorPage } from './components/BatchCreatorPage/BatchCreatorPage';
import { BatchEditorPage } from './components/BatchEditorPage/BatchEditorPage';
import { BatchViewer } from './components/BatchViewerPage/BatchViewerPage';
import { ConfigProvider } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { dndDragEndDetailState } from './services/BeautifulDnD';


const createPage = component => <div className="app">{component}</div>;

const App = () => {
    const [dragEndState, setDragEndState] = useRecoilState(dndDragEndDetailState);
    useEffect(() => void (dragEndState.result.destination && setDragEndState({ result: {}, provided: {} })), [dragEndState]);

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
                        <Route path='/' element={createPage(<HomePage />)} />
                        <Route path='/dyeing' element={createPage(<DyeingPage />)} />
                        <Route path='/slitting' element={createPage(<SlittingPage />)} />
                        <Route path='/stenter' element={createPage(<StenterPage />)} />
                        <Route path='/compector' element={createPage(<CompectorPage />)} />
                        <Route path='/delivery' element={createPage(<DeliveryPage />)} />
                        <Route path='/planning' element={createPage(<PlanningHomePage />)} />
                        <Route path='/planning/create-batch' element={createPage(<BatchCreatorPage />)} />
                        <Route path='/planning/edit-batch' element={createPage(<BatchEditorPage />)} />
                        <Route path='/planning/view-batch' element={createPage(<BatchViewer />)} />
                    </Routes>
                </BrowserRouter>
            </DragDropContext>
        </ConfigProvider>
    );
};

export default App;
