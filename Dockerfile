# Pull base Node image
FROM node:20-bullseye-slim

# Set working directory
WORKDIR /app

# Install basic development tools
RUN apt-get update && apt-get install -y \
    git \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Install global React Native CLI tools
RUN npm install -g react-native-cli

# Expose Metro Bundler port
EXPOSE 8081

# Default command
CMD ["bash"]
