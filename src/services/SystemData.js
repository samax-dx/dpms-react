import { AimOutlined, ApiOutlined, EyeOutlined, TagOutlined, UsbOutlined, GiftOutlined, AliyunOutlined } from '@ant-design/icons';


export const processLabels = {
    "dyeing": "Dyeing",
    "squeezer": "Squeezer",
    "drying": "Drying",
    "slitting": "Slitting",
    "stentering": "Stentering",
    "compacting": "Compacting",
    "brushing": "Brushing"
};

export const processIcons = {
    "dyeing": props => <AimOutlined {...props} />,
    "squeezer": props => <ApiOutlined {...props} />,
    "drying": props => <EyeOutlined {...props} />,
    "slitting": props => <TagOutlined {...props} />,
    "stentering": props => <UsbOutlined {...props} />,
    "compacting": props => <GiftOutlined {...props} />,
    "brushing": props => <AliyunOutlined {...props} />
};

export const processParamLabels = {
    "processId": "Process",
    "width_before": "Width Before",
    "width_after": "Width After",
    "over_feed": "Over Feed",
    "pin_width": "Spreader/Pin Width",
    "padder_pressure": "Padder Pressure",
    "machine_speed": "Machine Speed",
    "machineId": "Machine No."
};
