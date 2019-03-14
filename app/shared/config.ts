import applicationSettingsModule = require("application-settings");

class Config {
	get apiUrl() {
		return "https://mondo.geomatic.com.au/api"
	}

	invalidateToken() {
		this.token = "";
	}

	get token(): string {
		return applicationSettingsModule.getString('token');
	}
	set token(value: string) {
		console.log('set token ' + value)
		applicationSettingsModule.setString('token', value);
	}
}

export default new Config();
