import { Button, ConfigProvider } from 'antd';

const CustomButton = ({text, onClick}) => {
    return(
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: '#868D89FF',
                        algorithm: true,
                        },
                },
            }}
        >
            <Button 
                type="primary"
                onClick={onClick}
                size="large"
            >
                {text}
            </Button>
        </ConfigProvider>
    );
};

export default CustomButton;