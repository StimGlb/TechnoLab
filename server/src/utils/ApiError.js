// ============================================
// ⚠️ Classe d'erreur API personnalisée
// ============================================

export class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Méthodes factory pour erreurs courantes
  static badRequest(message = 'Requête invalide') {
    return new ApiError(400, message);
  }
  
  static unauthorized(message = 'Non autorisé') {
    return new ApiError(401, message);
  }
  
  static forbidden(message = 'Accès interdit') {
    return new ApiError(403, message);
  }
  
  static notFound(message = 'Ressource non trouvée') {
    return new ApiError(404, message);
  }
  
  static conflict(message = 'Conflit de données') {
    return new ApiError(409, message);
  }
  
  static tooManyRequests(message = 'Trop de requêtes') {
    return new ApiError(429, message);
  }
  
  static internal(message = 'Erreur interne du serveur') {
    return new ApiError(500, message, false);
  }
  
  static serviceUnavailable(message = 'Service indisponible') {
    return new ApiError(503, message);
  }
}