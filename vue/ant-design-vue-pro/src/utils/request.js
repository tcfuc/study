import axios from "axios";

function request(options) {
    return axios(options)
        .then(res => { return res })
        .catch(error => {
            const { response: { status, statusText } } = error
            Notification.error({
                // eslint-disable-next-line no-unused-vars
                message: h => (
                    <div>
                        请求错误 <span style="color: red">{status}</span> : {options.url}
                    </div>
                ),
                description: statusText
            });
            return Promise.reject(error);
        });
}

export default request;
