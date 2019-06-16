import axios from 'axios'

// axios.defaults.baseURL = 'https://api2.bmob.cn/';
// axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.headers['X-Bmob-Application-Id'] = 'cc080420335ad0012dfe80b13209c2fc';
// axios.defaults.headers['X-Bmob-REST-API-Key'] = '421d3ac8ce77498765d38f6a4b5740af';

export default axios.create({
    // baseURL: 'https://api2.bmob.cn/',
    headers: {
        'Content-Type': 'application/json',
        'X-Bmob-Application-Id':'cc080420335ad0012dfe80b13209c2fc',
        'X-Bmob-REST-API-Key':'421d3ac8ce77498765d38f6a4b5740af'
    }
});
