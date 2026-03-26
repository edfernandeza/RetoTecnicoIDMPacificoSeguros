function correlationID() {
          var randomLength = Math.floor(Math.random() * 64) + 1; // obtengo una longitud entre 1 <= X <= 64
          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var result = '';
          for (var i = 0; i < randomLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
        return result;
        }