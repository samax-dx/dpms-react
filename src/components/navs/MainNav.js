import { } from '@styles/Menu.module.css';

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, ReconciliationOutlined, } from "@ant-design/icons";


export const MainNav = () => {
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: "",
            icon: <HomeOutlined />
        },
        {
            label: <Link to={"/planning"}>Batch Planning</Link>,
            key: "planning",
            icon: <ReconciliationOutlined />,
            className: "parent-link",
            children: [
                {
                    label: <Link to={"/planning/create-batch"}>Create New Batch</Link>,
                    key: "create-batch",
                },
                {
                    label: <Link to={"/planning/edit-batch"}>Edit / Publish Batch</Link>,
                    key: "edit-batch",
                },
                {
                    label: <Link to={"/planning/view-batch"}>View Planned Batches</Link>,
                    key: 'view-batch',
                }
            ]
        },
        {
            label: <Link to={"/published-batches"}>Published Batches</Link>,
            key: "published-batches"
        }
    ];

    const { pathname: current_route } = useLocation();

    var selectedKeys = current_route.replace("/", "").split("/");
    if (selectedKeys.length > 1) {
        selectedKeys = current_route.replace("/", "").replace("planning/", "").split("/");
    }

    return (
        <Menu
            selectedKeys={current_route.replace("/", "").split("/")}
            mode="horizontal"
            items={items}
            style={{ backgroundColor: "transparent" }}
        />
    );
};
