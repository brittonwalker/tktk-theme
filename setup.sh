echo
echo "______          _           _     _____      _ _   "
echo "| ___ \        (_)         | |   |_   _|    (_) |  "
echo "| |_/ / __ ___  _  ___  ___| |_    | | _ __  _| |_ "
echo "|  __/ '__/ _ \| |/ _ \/ __| __|   | || '_ \| | __|"
echo "| |  | | | (_) | |  __/ (__| |_   _| || | | | | |_ "
echo "\_|  |_|  \___/| |\___|\___|\__|  \___/_| |_|_|\__|"
echo "              _/ |                                 "
echo "             |__/                                  "
echo 'Athletics Project Init'
echo 'Version 1.0'

# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[0;32m'

# Reading .eslintrc.js as text string
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
ESLINT_TEXT=`cat ${SCRIPTPATH}/.eslintrc.js`;

# Functions
function install_scripts() {
  echo
  echo "${GREEN}Installing packages...${NC}";
  npm install eslint @athletics/eslint-config --save-dev;
  echo "${GREEN}ESLint packages installed!${NC}";
}

function create_config() {
  echo 
  echo "${GREEN}Creating ESLint config file...${NC}";
  printf "${ESLINT_TEXT}" ] > '.eslintrc.js'
  echo ".eslintrc.js created and configured!";
}

# Check Node Version
echo
echo "${GREEN}Checking Node version...${NC}";

NODE_VERSION=$(node --version);

if [[ "${NODE_VERSION:1:2}" == "12" || "${NODE_VERSION:1:2}" == "14" || "${NODE_VERSION:1:2}" == "16" ]];
then
  echo "Congrats! You have Node ${NODE_VERSION}";
else
  echo "${RED}You must have Node version ^12.22.0, ^14.17.0, or >=16.0.0";
  echo "Please upgrade your version of Node${NC}";
  exit;
fi

# Check package.json
echo
echo "${GREEN}Checking package.json...${NC}";

if [ ! -f "package.json" ];
then
  echo -n 'Package.json does not exist. Would you like to create one? (y/n): '
  read createpackagejson

  if [ "${createpackagejson}" == "y" ]
  then
    echo
    npm init;
    install_scripts;
    create_config;
  else
    echo "${RED}Please create a package.json file first.${NC}";
  fi
else
  echo "package.json exists!";
  install_scripts;
  create_config;
fi

echo
echo "${GREEN}Athletics Project Init complete!${NC}";
exit;